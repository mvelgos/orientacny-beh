Vue.component('progress-bar', {
    props: { percentage: Number },
    template: '<div class="progress progress-bar" v-bind:style="{ visibility: percentage != 100 ? \'visible\' : \'hidden\'}"><div class="bar" v-bind:style="{ width: percentage+\'%\'}"></div></div>'
});

Vue.component('results-list', {
    props: {
        items: Array,
    },
    template: '<ul id="results-list" class="list list-vertical"><li v-for="item in items" class="item"><ul class="list list-horizontal"><li class="data data-ranking">{{ item.ranking }}</li><li class="data data-racer"> <ul class="list list-vertical"><li class="data data-name">{{ item.racer.name }}</li><li class="data data-club">{{ item.racer.club }}</li></ul> </li><li class="data data-country" v-if="hasFlag(item.racer.country)"><img :src="getFlag(item.racer.country)" alt="flag"></li><li class="data data-country" v-else>{{ item.racer.country }}</li><li class="data data-time time-total">{{ item.time.total }}</li><li class="data data-time time-diff">{{ item.time.diff }}</li></ul></li></ul>',
    methods: {
        hasFlag: function(iso3code){
            return flags.hasOwnProperty(iso3code.toLowerCase());
        },
        getFlag: function(iso3code){
            return flags[iso3code.toLowerCase()];
        }
    }
});

Vue.component('widget', {
    template: '<div class="widget"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer"><slot name="footer"></slot></div></div>'
});

Vue.component('page', {
    template: '<div class="page"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer"><slot name="footer"></slot></div></div>',
});