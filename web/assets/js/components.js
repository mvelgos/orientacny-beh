Vue.component('progress-bar', {
    props: { percentage: Number },
    template: '<div class="progress progress-bar" v-bind:style="{ visibility: percentage != 100 ? \'visible\' : \'hidden\'}"><div class="bar" v-bind:style="{ width: percentage+\'%\'}"></div></div>'
});

Vue.component('results-list', {
    props: { items: Array },
    template: '<ul id="results-list" class="list list-vertical"><li v-for="item in items" class="item"><ul class="list list-horizontal"><li class="data data-ranking">{{item[1]}}</li><li class="data data-racer"> <ul class="list list-vertical"><li class="data data-name">{{item[2]}}</li><li class="data data-club">{{item[3]}}</li></ul> </li><li class="data data-country">{{item[4]}}</li><li class="data data-time time-total">{{item[5]}}</li><li class="data data-time time-diff">{{item[6]}}</li></ul></li></ul>',
});

Vue.component('widget', {
    template: '<div class="widget"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer"><slot name="footer"></slot></div></div>'
});

Vue.component('page', {
    template: '<div class="page"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer"><slot name="footer"></slot></div></div>',
});