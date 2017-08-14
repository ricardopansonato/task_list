const Title = ({taskCount}) => {
  return (
    <div>
       <div>
          <h1>Task list ({taskCount})</h1>
       </div>
    </div>
  );
}
const TaskForm = ({addTask}) => {
  let input;
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};
const Task = ({task, remove}) => {
  return (<a href="#" className="list-group-item" onClick={() => {remove(task.task_id)}}>{task.text}</a>);
}
const TaskList = ({tasks, remove}) => {
  const taskNode = tasks.map((task) => {
    return (<Task task={task} key={task.task_id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{taskNode}</div>);
}
window.id = 0;
class TaskApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl = '/tasks'
  }
  componentDidMount(){
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data:res.data.tasks});
      });
  }
  addTask(val){
    const task = {text: val}
    axios.post(this.apiUrl, task)
       .then((res) => {
          task.task_id = res.data.task_id;
          this.state.data.push(task);
          this.setState({data: this.state.data});
       });
  }
  handleRemove(task_id){
    const remainder = this.state.data.filter((task) => {
      if(task.task_id !== task_id) return task;
    });
    axios.delete(this.apiUrl + '/' + task_id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }
  render(){
    return (
      <div>
        <Title taskCount={this.state.data.length}/>
        <TaskForm addTask={this.addTask.bind(this)}/>
        <TaskList
          tasks={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
ReactDOM.render(<TaskApp />, document.getElementById('container'));