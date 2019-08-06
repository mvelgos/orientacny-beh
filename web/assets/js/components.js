Vue.component('list', {
    props: { items: Array },
    template: '<ul class="list"><template></template></ul>'
});

Vue.component('results-list', {
    props: { racers: Array },
    template: '<ul id="results-list" class="list list-vertical"><li v-for="item in racers" class="item"><ul class="list list-horizontal"><li class="data data-category">{{item[0]}}</li><li class="data data-ranking">{{item[1]}}</li><li class="data data-racer"> <ul class="list list-vertical"><li class="data data-name">{{item[2]}}</li><li class="data data-club">{{item[3]}}</li></ul> </li><li class="data data-country">{{item[4]}}</li><li class="data data-time time-total">{{item[5]}}</li><li class="data data-time time-diff">{{item[6]}}</li></ul></li></ul>'
});

// todo
// page component
// widget component
// list-item
// loading
