class Suggestion {
    constructor(options) {
        this.options = options
        this.$input = $(options.input)
        this.$input.wrap('<div class="weiSuggestion"></div>')
        this.$wrapper = this.$input.parent()

        this.$ol = $('<ol class="weiSuggestion-list"></ol>')
        this.$input.after(this.$ol)
        this.$loading = $('<div class="weiSuggestion-loading"></div>')
        this.$loading.html(this.options.loadingTemplate)
        this.$ol.after(this.$loading)
        this.bindEvents()
    }
    bindEvents() {
        let self = this

        // debounce
        let timerId
        self.$input.on('input', function(e) {
            if(timerId) {
                window.clearTimeout(timerId)
            }
            timerId = setTimeout(function() {
                self.search(e.currentTarget.value)
                timerId = undefined              
            }, 300)
        })
    }
    search(keyword) {
        let self = this

        self.$wrapper.addClass('loading')
        self.options.search(keyword, function(array) {
            self.$wrapper.removeClass('loading')
            self.$ol.empty()
            array.forEach(function(text) {
                self.$ol.append($('<li></li>').text(text))
            })
        })        
    }    
}

// 用例
var s = new Suggestion({
    input: 'input',
    search: function(text, callback) {
        let array = []
        for (let index = 0; index <5; index++) {
            let n = parseInt(Math.random()*100, 10)    
            array.push(text + n)
        }
        setTimeout(function() {callback(array)}, 2000)
    },
    loadingTemplate: '加载中'
})
