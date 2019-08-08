window.app = new Vue({
    router: new VueRouter({
        routes: [
            { path: '/:cat', component: { template: '' } }
        ]
    }),
    data: {
        racedata: [],
        categories: [],
        settings: {
            ajax: {
                url: "https://raw.githubusercontent.com/bletvaska/orientacny-beh/master/data/example.data.csv",
                interval: 30000,
                timeout: 0
            },
            categories: [
                { label: "M3X", path: "/m3x", filter: "M3" },
                { label: "M4X", path: "/m4x", filter: "M4" },
                { label: "M5X", path: "/m5x", filter: "M5" },
                { label: "M6X", path: "/m6x", filter: "M6" },
                { label: "M7X", path: "/m7x", filter: "M7" },
                { label: "W3X", path: "/w3x", filter: "W3" },
                { label: "W4X", path: "/w4x", filter: "W4" },
                { label: "W5X", path: "/w5x", filter: "W5" },
                { label: "W6X", path: "/w6x", filter: "W6" },
                { label: "W7X", path: "/w7x", filter: "W7" },
            ],
        },
    },
    watch: {
        racedata: function(){
            let filter = this.getFilterByPath(this.$route.path);
            this.categories = this.getFilteredCategories(filter);
        }
    },
    methods: {
        loadData: function(){
            var self = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    self.racedata = self.parseCSVData(this.responseText, ";");
                    // use watch instead
                    // self.$router.push('/m3x');
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
        },
        getFilterByPath: function(path){
            let filtered = this.settings.categories.filter(function(category){ return category.path === path });
            return filtered.length > 0 ? filtered[0].filter : '';
        },
        getFilteredCategories: function(filter){
            let all = [];
            let filtered = [];
            for (index in this.racedata) {
                if(all.indexOf(this.racedata[index][0]) === -1){
                    all.push(this.racedata[index][0]);
                }
            }
            filtered = all.filter(function(value){ return value.indexOf(filter) !== -1; });
            return filtered;
        },
        getResults: function(category){
            let result = [];
            for (index in this.racedata) {
                if(this.racedata[index][0] === category){
                    result.push(this.racedata[index]);
                }
            }
            return result;
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
}).$mount('#app');