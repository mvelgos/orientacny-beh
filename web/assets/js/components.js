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

Vue.component('scroll', {
    // up-down for now
    template: '<div class="scroll"><slot></slot></div>',
    data: function(){
        return {
            animation: {
                interval: null,
                direction: "up"
            },
            viewHeight: 200,
            childHeight: 0,
            childCurrentPosition: 0
        }
    },
    computed: {
        maxScroll: function(){
            return this.childHeight - this.viewHeight;
        }
    },
    watch: {
        childCurrentPosition: function(){
            if(this.animation.direction === "up"){
                if(this.childCurrentPosition > this.maxScroll){
                    this.toggleDirection();
                }
            }
            if(this.animation.direction === "down"){
                if(this.childCurrentPosition < 0){
                    this.toggleDirection();
                }
            }
        }
    },
    methods: {
        toggleDirection: function(){
            this.animation.direction = this.animation.direction === 'up' ? 'down' : 'up';
        }
    },
    mounted: function(){
        var self = this;
        setTimeout(function(){
            self.childHeight = self.$children[0].$el.clientHeight;
        }, 100);

        this.animation.interval = setInterval(function(){
            if(self.childHeight > self.viewHeight){
                if(self.animation.direction === 'up'){
                    self.childCurrentPosition += 1;
                } else {
                    self.childCurrentPosition -= 1;
                }
                self.$children[0].$el.style.marginTop = "-" + self.childCurrentPosition + "px";
            } else {
                clearInterval(self.animation.interval);
            }
        },100);
    }
});

Vue.component('slider', {
    template: '<div class="slider"><slot></slot></div>',
    mounted: function(){
        console.log('slider created');
    }
});

Vue.component('widget', {
    template: '<div class="widget"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer" v-if="!!this.$slots.footer"><slot name="footer"></slot></div></div>'
});

Vue.component('page', {
    template: '<div class="page"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer"><slot name="footer"></slot></div></div>',
});