class Dialog {
    constructor(options) {
        this.options = options
        this.init()
    }
    get template() {
        let { title, content } = this.options
        return `
        <div class="weiDialog">
            <div class="weiDialog-wrapper">
                <header class="weiDialog-header">${title}</header>
                <main class="weiDialog-main">${content}</main>
                <footer class="weiDialog-footer"></footer>                
            </div>
        </div>
        `
    }
    get buttons() {
        let { buttons } = this.options
        var generatedButtons = buttons.map(function (buttonOption) {
            let $b = $('<button></button>')
            $b.text(buttonOption.text)
            $b.on('click', buttonOption.action)
            return $b
        })
        return generatedButtons
    }
    init() {
        var $dialog = $(this.template)
        $dialog.find('footer').append(this.buttons)
        $dialog.addClass(this.options.className)
        this.$dialog = $dialog
        this.setStatic()        
    }
    setStatic() {
        let self = this
        let { isStatic } = self.options
        if (!isStatic) {
            self.$dialog.on('click', function() {
                self.close()
            })
            self.$dialog.find('.weiDialog-wrapper').on('click', function(e) {
                e.stopPropagation()
            })
        }
    }
    open() {
        this.$dialog.appendTo('body')
    }
    close() {
        this.$dialog.detach()
    }
}

// 用例
x.onclick = function () {
    var dialog = new Dialog({
        title: '标题',
        content: '<b>欢迎</b',
        className: 'userDialog',
        static: false, // 点击弹出框外围消失
        buttons: [
            {
                text: '确定',
                action: function () {
                    setTimeout(function () {
                        alert('点击确定！')
                        dialog.close()
                    })
                }
            },
            {
                text: '取消',
                action: function () {
                    dialog.close()
                }
            }
        ]
    })
    dialog.open()
}
