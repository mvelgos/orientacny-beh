const DataService = {
    convert: function( data ){
        let result = {
            categories: [],
            results: []
        };

        for(let index in data){
            let item = data[index];
            let category = {
                name: item[0],
                slug: item[0].toLowerCase()
            };

            if(!result.categories.hasOwnProperty(category.slug)){
                result.categories[category.slug] = category;
            }
            if(!result.results.hasOwnProperty(category.slug)){
                result.results[category.slug] = [];
            }

            result.results[category.slug].push( DataService.convertItem(item) );
        }
        return result;
    },
    convertItem: function( item ){
        let club = typeof item[3] !== "undefined" ? item[3] : '-';

        return {
            ranking:        typeof item[1] !== "undefined" ? item[1]: '-',
            racer: {
                name:       typeof item[2] !== "undefined" ? item[2] : '-',
                club:       club.length > 20 ? club.substr(0, 20) + " ..." : club,
                country:    typeof item[4] !== "undefined" ? item[4] : '-'
            },
            time: {
                total:      typeof item[5] !== "undefined" ? item[5] : '-',
                diff:       typeof item[6] !== "undefined" ? item[6] : '-'
            }
        };
    },
    parseCSVData: function(strData, strDelimiter){
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter){
                arrData.push( [] );
            }
            var strMatchedValue;
            if (arrMatches[ 2 ]){
                strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ), "\"");
            } else {
                strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        return arrData;
    }
}

const DisplayService = {
    outerWidth: function(el){
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    },
    outerHeight: function(el){
        let height = el.offsetHeight;
        let style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    },
    windowViewport: function(){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    appHeight: function(){
        let headerHeight = DisplayService.outerHeight(document.getElementById("app-header"));
        let footerHeight = DisplayService.outerHeight(document.getElementById("app-footer"));
        return {
            header: headerHeight,
            body: window.innerHeight - (headerHeight + footerHeight),
            footer: footerHeight
        }
    }
}

const StorageService = {
    set: function(name, value){
        localStorage.setItem(name, value);
    },
    get: function(name){
        return localStorage.getItem(name);
    },
    contains: function(name){
        return !!localStorage.getItem(name)
    }
}