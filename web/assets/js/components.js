Vue.component('progress-bar', {
    props: { percentage: Number },
    template: '<div class="progress progress-bar" v-bind:style="{ visibility: percentage != 100 ? \'visible\' : \'hidden\'}"><div class="bar" v-bind:style="{ width: percentage+\'%\'}"></div></div>'
});

Vue.component('results-list', {
    props: {
        items: Array,
        settings: Object
    },
    template: '<ul id="results-list" class="list layout layout-vertical"><li v-for="item in items" class="item"><ul class="list layout layout-horizontal"><li class="data data-ranking">{{ item.ranking }}</li><li class="data data-racer"> <ul class="list layout layout-vertical"><li class="data data-name">{{ item.racer.name }}</li><li class="data data-club" v-if="settings.displayClub">{{ item.racer.club }}</li></ul> </li><li class="data data-country" v-if="settings.displayCountry"><img v-if="hasFlag(item.racer.country)" :src="getFlag(item.racer.country)" alt="flag"> <span v-else class="text">{{ item.racer.country }}</span></li><li class="data data-time time-total">{{ item.time.total }}</li><li class="data data-time time-diff">{{ item.time.diff }}</li></ul></li></ul>',
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
        },
        determineChildHeight: function(){
            this.childHeight = this.$children[0].$el.clientHeight;
        },
        determineParentHeight: function(){
            this.viewHeight = this.$parent.$el.children[2].clientHeight
        }
        // resetScroll
    },
    mounted: function(){
        var self = this;
        setTimeout(function(){
            self.determineChildHeight();
            self.determineParentHeight();
        }, 100);
        window.addEventListener('resize', function(){
            self.determineChildHeight();
            self.determineParentHeight();
        });

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
    props: {
        timeout: Number
    },
    template: '<div class="slider"><div class="view"><div class="content"><slot></slot></div></div></div>',
    mounted: function(){
        var self = this;
        setInterval(function(){
            self.$emit('slide', { direction: 'right'});
        }, this.timeout);
    }
});

Vue.component('grid', {
    template: '<div class="grid"><div class="view"><div class="content"><slot></slot></div></div></div>'
});

Vue.component('widget', {
    template: '<div class="widget"><div class="header"><slot name="header"></slot></div><div class="body"><slot></slot></div><div class="footer" v-if="!!this.$slots.footer"><slot name="footer"></slot></div></div>',
});