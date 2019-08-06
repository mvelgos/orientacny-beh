window.app = new Vue({
    el: '#app',
    data: {
        racers: [],
        settings: {
            ajax: {
                url: "https://raw.githubusercontent.com/bletvaska/orientacny-beh/master/data/example.data.csv",
                interval: 30000,
                timeout: 0
            }
        },
    },
    methods: {
        loadData: function(){
            var self = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    self.racers = self.parseCSVData(this.responseText, ";");
                }
            };
            xhttp.open("GET", this.settings.ajax.url, true);
            xhttp.send();
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
    },
    created: function() {
        var self = this;
        self.loadData();
        setTimeout(function(){
            setInterval(function(){
                self.loadData();
            }, self.settings.ajax.interval);
        }, self.settings.ajax.timeout);
    }
});