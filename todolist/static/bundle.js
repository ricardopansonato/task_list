/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function Title(_ref) {
  var taskCount = _ref.taskCount;

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Task list (",
        taskCount,
        ")"
      )
    )
  );
};
var TaskForm = function TaskForm(_ref2) {
  var addTask = _ref2.addTask;

  var input = void 0;
  return React.createElement(
    "form",
    { onSubmit: function onSubmit(e) {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
      } },
    React.createElement("input", { className: "form-control col-md-12", ref: function ref(node) {
        input = node;
      } }),
    React.createElement("br", null)
  );
};
var Task = function Task(_ref3) {
  var task = _ref3.task,
      remove = _ref3.remove;

  return React.createElement(
    "a",
    { href: "#", className: "list-group-item", onClick: function onClick() {
        remove(task.task_id);
      } },
    task.text
  );
};
var TaskList = function TaskList(_ref4) {
  var tasks = _ref4.tasks,
      remove = _ref4.remove;

  var taskNode = tasks.map(function (task) {
    return React.createElement(Task, { task: task, key: task.task_id, remove: remove });
  });
  return React.createElement(
    "div",
    { className: "list-group", style: { marginTop: '30px' } },
    taskNode
  );
};
window.id = 0;

var TaskApp = function (_React$Component) {
  _inherits(TaskApp, _React$Component);

  function TaskApp(props) {
    _classCallCheck(this, TaskApp);

    var _this = _possibleConstructorReturn(this, (TaskApp.__proto__ || Object.getPrototypeOf(TaskApp)).call(this, props));

    _this.state = {
      data: []
    };
    _this.apiUrl = '/tasks';
    return _this;
  }

  _createClass(TaskApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios.get(this.apiUrl).then(function (res) {
        _this2.setState({ data: res.data.tasks });
      });
    }
  }, {
    key: "addTask",
    value: function addTask(val) {
      var _this3 = this;

      var task = { text: val };
      axios.post(this.apiUrl, task).then(function (res) {
        task.task_id = res.data.task_id;
        _this3.state.data.push(task);
        _this3.setState({ data: _this3.state.data });
      });
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(task_id) {
      var _this4 = this;

      var remainder = this.state.data.filter(function (task) {
        if (task.task_id !== task_id) return task;
      });
      axios.delete(this.apiUrl + '/' + task_id).then(function (res) {
        _this4.setState({ data: remainder });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Title, { taskCount: this.state.data.length }),
        React.createElement(TaskForm, { addTask: this.addTask.bind(this) }),
        React.createElement(TaskList, {
          tasks: this.state.data,
          remove: this.handleRemove.bind(this)
        })
      );
    }
  }]);

  return TaskApp;
}(React.Component);

ReactDOM.render(React.createElement(TaskApp, null), document.getElementById('container'));

/***/ })
/******/ ]);