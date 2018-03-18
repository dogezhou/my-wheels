// var buttonOffset = $('button').offset()
// $(window).on('scroll', function() {
//     var scrollY = window.scrollY
//     if (scrollY > 0) {
//         $('#topbar').addClass('sticky')
//     } else {
//         $('#topbar').removeClass('sticky')        
//     }

//     if (scrollY + 60> buttonOffset.top) {
//         $('button').addClass('sticky')
//     } else {
//         $('button').removeClass('sticky')        
//     }
// })

class Sticky{
    constructor(selector, n) {
        this.elements = $(selector)
        this.offset = n || 0
        this.addPlaceholder()
        this.cacheOffsets()
        this.listenToScroll()
    }
    addPlaceholder() {
        var self = this

        self.elements.each(function(index, element) {
            var $wrapper = $('<div class="stickyPlaceholder"></div>')
            $(element).wrap($wrapper)
            $(element).parent().height($(element).outerHeight())
        })
    }
    cacheOffsets() {
        var self = this

        self.offsets = []
        self.elements.each(function(index, element) {
            self.offsets[index] = $(element).offset()
        })
    }
    listenToScroll() {
        var self = this

        $(window).on('scroll', function() {
            var scrollY = window.scrollY
            self.elements.each(function(index, element) {
                var $element = $(element)
                if (scrollY + self.offset > self.offsets[index].top) {
                    $element.addClass('sticky').css({top: self.offset})
                } else {
                    $element.removeClass('sticky')
                }
            })
        })
    }
}

new Sticky('#topbar')
new Sticky('button', 60)