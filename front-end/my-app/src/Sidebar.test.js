import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Sidebar from './Sidebar';
import axios from 'axios';


jest.mock('axios');

test('renders Sidebar and checks default resource type', () => {
    render(<Sidebar />);
    const resourceTypeElement = screen.getByDisplayValue(/films/i);
    expect(resourceTypeElement).toBeInTheDocument();
});

test('handles search term change', () => {
    render(<Sidebar />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
});

test('handles search', async () => {
    
        const { container } = render(<Sidebar />);
        axios.post.mockResolvedValue({
            data: {
                count: 1,
                next: null,
                previous: null,
                results: [
                    {
                        "title": "A New Hope",

                    },
                ],
            },
        });

        const searchInput = screen.getByPlaceholderText('Search...');
        const searchButton = screen.getByText('Search');
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'A New Hope' } });
          
          
          fireEvent.click(searchButton);
        });
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/search', {
            resourceType: 'films',
            searchTerm: 'A New Hope'
        });
        await act(async () => {
        await waitFor(() => {
            const resultsContainer = container.querySelector('.results-container');
            expect(resultsContainer).toBeInTheDocument();
        });
    });
});