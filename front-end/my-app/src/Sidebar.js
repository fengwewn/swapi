import React, { useState, } from 'react';
import axios from 'axios';
import { Radio, Input } from 'antd';
import './page.css';
const { Search } = Input;

function Sidebar() {
    const [resourceType, setResourceType] = useState('films');
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleResourceTypeChange = (event) => {
        setResourceType(event.target.value);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        setData(null)
        setIsLoading(true);
        await axios.post('http://localhost:3001/search', {
            resourceType,
            searchTerm
        }).then(response => {
            setData(response.data);
        })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="left">
                
                    {<Search
                        className="search-bar"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        enterButton="Search"
                        onSearch={handleSearch}
                        loading = {isLoading}
                    />}
                

                <div className="sidebar-container">
                    <Radio.Group onChange={handleResourceTypeChange} value={resourceType} className="radio-group">
                        <Radio value="films" className="radio-button">Films</Radio>
                        <Radio value="people" className="radio-button">People</Radio>
                        <Radio value="planets" className="radio-button">Planets</Radio>
                        <Radio value="species" className="radio-button">Species</Radio>
                        <Radio value="starships" className="radio-button">Starships</Radio>
                        <Radio value="vehicles" className="radio-button">Vehicles</Radio>
                    </Radio.Group>
                </div>
            </div>

            <div className="results-container">
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </>

    )
};
export default Sidebar;