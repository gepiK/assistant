let superagent = require('superagent');
let cheerio = require('cheerio');
let url = require('url');
let qs = require('querystring');

let CNode = function(url){
    cnodeUrl = url;
}

CNode.prototype = {
    getData:function(res){
        superagent.get(cnodeUrl)
        .end(function(err,sres){
            if(err) return next(err);
            let $ = cheerio.load(sres.text);
            let lastPageUrl = $('.pagination li:last-child').find('a').attr('href');
            // console.log(lastPageUrl);
            let totalPage=1
            if(lastPageUrl){
                let queryUrl = url.parse(lastPageUrl).query;
                let obj = qs.parse(queryUrl);
                totalPage = obj.page;
            }else {
                totalPage=$('.pagination').attr('current_page');
            }

            let items = [];
            $('#topic_list .topic_title').each(function(index,ele){
                let $ele = $(ele);
                let type = $ele.parents('.panel').find('.header .current-tab').text();
                items.push({
                    title:$ele.attr('title'),
                    href:$ele.attr('href'),
                    link:url.resolve(cnodeUrl,$ele.attr('href')),
                    type:type
                })
            })
            res.render('list',{
                title:'资源列表',
                items:items,
                totalPage:totalPage,
                pretty:true
            })
        })
    }
}
module.exports = CNode;