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
            uxui: {
                displayFirstNRacers: 3,

            }
        },
        countdown: {
            interval: null,
            value: {
                now: null,
                next: null
            },
            percentage: 0
        }
    },
    watch: {
        racedata: function(){
            let filter = this.getFilterByPath(this.$route.path);
            this.categories = this.getFilteredCategories(filter);
            this.resetCountdown();
        }
    },
    methods: {
        loadData: function(){
            var self = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let data = DataService.parseCSVData(this.responseText, ";");
                    self.racedata = DataService.convert(data);
                    // use watch instead
                    // self.$router.push('/m3x');
                }
            };
            xhttp.open("GET", this.settings.ajax.url, true);
            xhttp.send();
        },
        getFilterByPath: function(path){
            let filtered = this.settings.categories.filter(function(category){
                return category.path === path
            });
            return filtered.length > 0 ? filtered[0].filter : '';
        },
        getFilteredCategories: function(filter){
            let result = [];
            for(let key in this.racedata.categories){
                if(this.racedata.categories[key].name.indexOf(filter) !== -1){
                    result.push(this.racedata.categories[key])
                }
            }
            return result;
        },
        getResults: function(category, start, end){
            let result = [];
            for (let index in this.racedata.results[category]) {
                let shouldPush = false;
                if(index >= start && index < end){
                    shouldPush = true;
                }

                if(shouldPush){
                    result.push(this.racedata.results[category][index]);
                }
            }
            return result;
        },
        resetCountdown: function(){
            this.countdown.value.next = new Date();
            this.countdown.value.next.setMilliseconds(this.countdown.value.next.getMilliseconds() + this.settings.ajax.interval);
        },
        countdownPercentage: function(){
            let diffSeconds = parseInt((this.countdown.value.next.getTime() - this.countdown.value.now.getTime()) / 1000);
            let percentage = parseInt(100 - (100 * diffSeconds / (this.settings.ajax.interval / 1000)));
            this.countdown.percentage = percentage;
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

        setInterval(function(){
            self.countdown.value.now = new Date();
            self.countdownPercentage();
        }, 1000);
    }
}).$mount('#app');