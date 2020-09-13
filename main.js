const load = require("cheerio").load
const fs = require("fs")
const axios = require("axios")
config = require("./config")
const mapi=  process.env.cpapi;
async function qidian(id) {
    let url = `https://book.qidian.com/info/${id}`
    let res = await axios.get(url)
    let $ = load(res.data)
    a = $(".update>.detail>p>a")
    b = $(".update>.detail>p>.time").text()
    u = a.attr("href")
    t = a.attr("title")
    cid = u.match(/\d+/g)[1]
    if (config.cid == cid) {
        console.log("暂无更新")
    } else {
        console.log("有更新啦")
        let content = `c=(测试)
某某追更的小说更新啦 ● ${b}
${t}
http:${u}`
        let res = await axios.post(mapi, content)
        fs.writeFile("./config.js", `config={
  id:${id},
  cid:${cid}
}
module.exports=config`, {
                flag: "w",
            },
            (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("success");
                }
            }
        );
    }
}


qidian(config.id)
