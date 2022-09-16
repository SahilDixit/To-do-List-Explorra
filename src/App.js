import React from 'react';
import './App.css';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : {
        task : "",
        status : false
      },
      lists : [],
      pos : -1
    }
  }

  handleChange=(e) => {
    const {name,value} = e.target;
    let list = {...this.state.list};
    list[name] = value;
    
    this.setState({
      list
    });
  }

  clearForm = () => {
    this.setState({
      list : {
        task : "",
        status : false
      }
      });
    }
  

  handleSave = (index,remove) => {
    let lists = [...this.state.lists];
    this.clearForm();
    if(remove)
      lists.splice(index,1);
    else if(index===-1)
      lists.push(this.state.list);
    else if(index>-1)
      lists[index]=this.state.list;

    console.log("lists",lists);
    this.setState({
      lists,
      pos:-1,
    })
  }

  handleQuickEdit = (index) => {
    let lists = [...this.state.lists];
    this.setState({
      list : lists[index],
      pos : index 
    });
    console.log("list--->",this.state.list)
  }

  handleStatus = (index) => {
    let lists = [...this.state.lists]
    lists[index].status = !lists[index].status;
    this.setState({
      list:lists[index].status
    })
  }

  render() {
    return (
      <div>
        <h1 className='heading'>TO DO LIST</h1>
        <form className='forms'>
        <table>
          <tr>
            <td><label>Task :</label></td>
            <td><input type='text' name='task' value={this.state.list.task} onChange={(e) => {this.handleChange(e)}}></input></td>
          </tr>
        </table>
        <input className='btn' type='button' value='Submit' onClick = {() => {this.handleSave(this.state.pos)}}></input> 
        </form>
        <br />
        <table border='solid black'>
          <thead>
            <tr>
              <td>Tasks</td>
              <td>Actions</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.lists.length ?
              this.state.lists.map((ele,index)=>{
                return (
                  <tr key={index}>
                    <td className={ele.status ? "strike" : "none"}>{ele.task}</td>
                    <td>
                      <div>
                        <button className='btn1' onClick={() => {this.handleQuickEdit(index)}}>Edit</button>
                        <button  className='btn1' onClick={() => {this.handleSave(index,true)}}>Delete</button>
                      </div>
                    </td>
                    <td>
                      <button className='btn1' onClick={() => {this.handleStatus(index)}}>{ele.status ? "complete" : "Incomplete"} </button>
                    </td>
                  </tr>
                )
              })
              :
              <tr><td colSpan='3'>NO DATA</td></tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;