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
            results: {
                staticPlacesCount: 3,
                displayClub: true,
                displayCountry: true
            }
        },
        countdown: {
            interval: null,
            value: {
                now: null,
                next: null
            },
            percentage: 0
        },
        viewport: null
    },
    computed: {

    },
    watch: {
        racedata: function(){
            this.categories = this.getCategories(this.$route.query.categories);
            this.countdownReset();
        },
        viewport: function(){
        },
    },
    methods: {
        loadData: function(){
            var self = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let data = DataService.parseCSVData(this.responseText, ";");
                    self.racedata = DataService.convert(data);
                }
            };
            xhttp.open("GET", this.settings.ajax.url, true);
            xhttp.send();
        },
        getCategories: function(categories){
            let result = [];
            if(typeof categories === "undefined"){
                for(let key in this.racedata.categories){
                    result.push(this.racedata.categories[key])
                }
            } else {
                for(let key in this.racedata.categories){
                    let category = this.racedata.categories[key];
                    if(categories.indexOf(category.slug) !== -1){
                        result.push(this.racedata.categories[key])
                    }
                }
            }
            return result;
        },
        getResults: function(category, start, end){
            let result = [];
            for (let index in this.racedata.results[category]) {
                let shouldPush = false;
                if(index >= start && index < end){ shouldPush = true; }
                if(shouldPush){
                    result.push(this.racedata.results[category][index]);
                }
            }
            return result;
        },
        countdownReset: function(){
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
        // check storage for stored settings

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
    },
    mounted: function() {
        this.viewport = DisplayService.windowViewport();
        window.addEventListener('resize', function(e){
            window.app.viewport = DisplayService.windowViewport();
        });
    }
}).$mount('#app');