
//是否验证证书的有效性
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

// 引入必要的库
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// 创建express应用
const app = express();

// 使用cors中间件
app.use(cors());
app.use(bodyParser.json());

// 读取extra_character.json文件中的数据
let extraCharactersData = null;
try {
  extraCharactersData = fs.readFileSync('extra_character.json', 'utf8');
} catch (err) {
  console.log('No extra characters data found');
}
const extraCharacters = extraCharactersData ? JSON.parse(extraCharactersData) : [];


app.post('/search', async (req, res) => {
    const { resourceType, searchTerm } = req.body;
    const response = await axios.get(`https://swapi.dev/api/${resourceType}/?search=${searchTerm}`);
    const characters = [...response.data.results, ...extraCharacters.results.filter(character => character.name.includes(searchTerm))];
    res.json(response.data);
    //console.log('111');
  });
// 启动服务器
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});