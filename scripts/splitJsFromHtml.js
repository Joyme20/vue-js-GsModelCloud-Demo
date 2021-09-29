/*
 * @Description: 把html的script和link代码分离成一个script文件
 */

const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname, '../src');
let dirPath = `public/viewerWrapperLocal/index.html`
// let dirPath = `../ceec-test/public/viewerWrapperLocal/index.html`


const url = process.argv[2];


// fs.readdir(dirPath, (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   files.forEach(file => {
//     split(file)
//   })
//
// })

split(dirPath)

function split(path) {
    let filePath = dirPath
    let newFilePath = `public/viewerWrapperLocal/index.js`

    if (fs.existsSync(dirPath)) {
        // console.log("文件已存在：" + newFilePath)
    // } else {
        fs.stat(filePath, function (err, stats) {
            if (err) throw err;
            //文件
            if (stats.isFile()) {
                try {
                    const data = fs.readFileSync(filePath, 'utf-8');
                    // 文件中的换行符没有被.*所匹配，因为.匹配的是除了换行符之外的任意字符，所以这里将.*改为[\s\S]*即可
                    let linkReg = /<link href="(http|css|js|viewerWrapperLocal).*"><link/g
                    let scriptReg = /<script type="text\/javascript" src=".*js"><\/script>/g

                    let linkStringArr = data.match(linkReg).length === 1 ? data.match(linkReg)[0].split("<link") : data.match(linkReg)
                    let formatLinkStringArr = []
                    for (let i = 0; i < linkStringArr.length; i++) {
                        let item = linkStringArr[i]
                        let match = item.match(/prefetch|preload|stylesheet/)
                        if (match && match.length > 0) {
                            let href = linkStringArr[i].match(/href=".*s"/)[0].replace(/href="/, "").replace(/"/, "")
                            let rel = linkStringArr[i].match(/prefetch|preload|stylesheet/)[0]
                            let as = linkStringArr[i].match(/style|script/) ? linkStringArr[i].match(/style|script/)[0] : null
                            let newString = {href, rel, as}
                            // let newString = linkStringArr[i]
                            formatLinkStringArr.push(newString)
                        }

                    }
                    // let formatLinkStringArr = linkStringArr.forEach(item => {
                    //     let newString = item.replace("<link href=\"", "").replace("\" rel=\"prefetch\">", "")
                    //         return newString
                    //     })
                    let scriptStringArr = data.match(scriptReg).length === 1 ? data.match(scriptReg)[0].split("<script") : data.match(scriptReg)
                    let formatScriptStringArr = []
                    for (let i = 0; i < scriptStringArr.length; i++) {
                        let newString = scriptStringArr[i].match(/(http|css|js|viewerWrapperLocal).*js/)
                        if(newString){
                            formatScriptStringArr.push(newString)
                        }
                    }
                    // let formatScriptStringArr = scriptStringArr.forEach(item => {
                    //     return item.replace("<script src=\"", "").replace("\"><\\/script>", "")
                    // })
                    let linkText = 'let linkStringArr = ' + JSON.stringify(formatLinkStringArr) +
                        `;
linkStringArr.forEach(item=>{
    let link = document.createElement("link");
    link.href = item.href;
    link.rel = item.rel;
    if(item.as){link.as = item.as;}
    document.head.appendChild(link);
    
});`
                    let scriptText = 'let scriptStringArr = ' + JSON.stringify(formatScriptStringArr) +
                        `;
scriptStringArr.forEach(item=>{
    let script = document.createElement("script");
    script.src = item;
    script.type = "text/javascript"
    document.body.appendChild(script);
});`


                    // scriptStringArr.forEach(item => {
                    //     scriptText += "require('" + item + "');"
                    //
                    //
                    // })
                    fs.writeFileSync(newFilePath, linkText + scriptText, (err, stats) => {
                        if (err) throw err;
                        console.log('write ts file success：' + newFilePath);
                    })
                } catch (err) {
                    console.log('读取文件发生错误：' + filePath, err);
                }
            } else if (stats.isDirectory()) {
            }
        });
    }

}

//获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

let viewerWrapperDemoHtmlPath = `public/viewerWrapperDemo.html`
fs.stat(viewerWrapperDemoHtmlPath, function (err, stats) {
    if (err) throw err;
    if (stats.isFile()) {
            try {
                const data = fs.readFileSync(viewerWrapperDemoHtmlPath, 'utf-8');
                // 文件中的换行符没有被.*所匹配，因为.匹配的是除了换行符之外的任意字符，所以这里将.*改为[\s\S]*即可
                let reg = /<script src=".*"><\/script>/g
                let text = data.replace(reg, `<script src="${url}index.js"></script>`)
                fs.writeFileSync(viewerWrapperDemoHtmlPath, text, )
            } catch (err) {
                console.log('读取文件发生错误：' + viewerWrapperDemoHtmlPath, err);
            }
    }
});

let exportViewerWrapperTsPath = `src/exportViewerWrapper.ts`
fs.stat(exportViewerWrapperTsPath, function (err, stats) {
    if (err) throw err;
    if (stats.isFile()) {
        try {
            const data = fs.readFileSync(exportViewerWrapperTsPath, 'utf-8');
            // 文件中的换行符没有被.*所匹配，因为.匹配的是除了换行符之外的任意字符，所以这里将.*改为[\s\S]*即可
            let reg = /LonganLoaded\.import\(".*longanWithoutShareArrayBuffer\/longan\.js"\);/g
            let text = data.replace(reg, `LonganLoaded\.import("${url}js\/longanWithoutShareArrayBuffer\/longan\.js");`)
            // console.log(text)

            fs.writeFileSync(exportViewerWrapperTsPath, text, )
        } catch (err) {
            console.log('读取文件发生错误：' + exportViewerWrapperTsPath, err);
        }
    }
});

// let viewerWrapperExportTsPath = `src/pages/modelEdit/viewerWrapperExport.ts`
// fs.stat(viewerWrapperExportTsPath, function (err, stats) {
//     if (err) throw err;
//     if (stats.isFile()) {
//         try {
//             const data = fs.readFileSync(viewerWrapperExportTsPath, 'utf-8');
//             // 文件中的换行符没有被.*所匹配，因为.匹配的是除了换行符之外的任意字符，所以这里将.*改为[\s\S]*即可
//             let reg = /url:.*model-service/g
//             let text = data.replace(reg, `url:\"${url}model-service`)
//             // console.log(text)

//             fs.writeFileSync(viewerWrapperExportTsPath, text, )
//         } catch (err) {
//             console.log('读取文件发生错误：' + viewerWrapperExportTsPath, err);
//         }
//     }
// });

