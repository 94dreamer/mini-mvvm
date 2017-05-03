// 利用defineProperty实现对对象属性的劫持
var data = {};
var nameValue = 'Lee';

Object.defineProperty(data, 'name', {
  // value:'Lee',
  get: function () {
    console.log(nameValue);
    return nameValue
  },
  set: function (newValue) {
    console.log(newValue);
    if (nameValue !== newValue) {
      nameValue = newValue;
    }
  },
  configurable: true,
  // writable:true, //不能设置writable
});

data.name;
data.name = 'Ace';

//如何实现数据双向绑定
// 1 一个方法来识别哪些UI元素被绑定了相应的属性
// 2 需要监视属性和UI元素的变化
// 3 将所有变化传播到绑定的对象和UI元素


function DataBinder(object_id) {
  //创建一个简单的pubSub对象
  var pubSub = {
    callbacks: {},
    on: function (msg, callback) {
      this.callbacks[msg] = this.callbacks[msg] || [];
      this.callbacks[msg].push(callback);
    },
    publish: function (msg) {
      this.callbacks[msg] = this.callbacks[msg] || [];
      for (let i = 0, len = this.callbacks[msg].length; i < len; i++) {
        this.callbacks[msg][i].apply(this, Array.prototype.slice.call(arguments, 1))//获取arguments除了msg之外的参数
      }
    }
  }

  var data_attr = "data-bind-" + object_id;
  var view_attr = 'data-' + object_id;
  var message = object_id + ":change";

  var changeHandler = function (e) {
    var target = e.target;
    var prop_name = target.getAttribute(data_attr);
    if (prop_name) {
      pubSub.publish(message, target, prop_name, target.value);
    }
  };

  document.addEventListener("keyup", changeHandler, false);

  pubSub.on(message, function (event, prop_name, new_val) {
    var elements = document.querySelectorAll("[" + view_attr + "=" + prop_name + "]");
    var tag_name;

    for (var i = 0, len = elements.length; i < len; i++) {
      tag_name = elements[i].tagName.toLowerCase();
      if (tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
        elements[i].value = new_val;
      } else {
        elements[i].innerHTML = new_val;
      }
    }
  });
  return pubSub;
}



