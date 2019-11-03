import React from 'react';
import './App.css';

function ProjectList(props) {
    return <ul>
      {props.projectlist.map((item,i) => {
        return <li key={i}>{item.id} {item.name} {item.description} <button onClick={() => props.onRemove(item)}>remove</button></li>
      })}
    </ul>
}

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProject: {
        id:'',
        name:'',
        description:''
      },
      cantSubmit: true
    }
    
    this.alphaKeyPress = this.alphaKeyPress.bind(this);
    this.updateProjectId = this.updateProjectId.bind(this);
    this.updateProjectName = this.updateProjectName.bind(this);
    this.updateProjectDescription= this.updateProjectDescription.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  alphaKeyPress(e) {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  updateProjectId(e) {
    this.setState({newProject:{...this.state.newProject,id:e.target.value}});
    this.validateForm();
  }

  updateProjectName(e) {
    this.setState({newProject:{...this.state.newProject,name:e.target.value}});
    this.validateForm();
  }

  updateProjectDescription(e) {
    this.setState({newProject:{...this.state.newProject,description:e.target.value}});
    this.validateForm();
  }

  validateForm(){
    this.setState({cantSubmit: !(this.state.newProject.id.length > 0 && 
      this.state.newProject.name.length > 0 &&
      this.state.newProject.description.length > 0)})
  }

  submitForm(e){
    e.preventDefault();
    if(!this.state.cantSubmit){
      this.props.onSave(this.state.newProject);
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <label htmlFor="id">Id:</label>
          <input name="id" onChange={this.updateProjectId} type="text" ref="id" onKeyPress={this.alphaKeyPress} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input onChange={this.updateProjectName} name="name" type="text" />
        </div>
        <div>
          <label htmlFor="Description:">Description:</label>
          <textarea onChange={this.updateProjectDescription} name="description"></textarea>
        </div>
      <button type="submit" disabled={this.state.cantSubmit} >submit</button>
      </form>
    );
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        projectList: [
          {id: '111',
          name: 'Project One',
          description: 'Our First List'
        },
        {id: '112',
          name: 'Project Two',
          description: 'Our Second List'
        }
      ] 
      }
    }

    updateList = (newProject) => {
      let newList = this.state.projectList;
      newList.push(newProject);
      this.setState({projectList:newList});
    }

    removeItem = (itemToRemove) => {
      let newList = this.state.projectList;
      newList = newList.filter(item => item.id !== itemToRemove.id);
      this.setState({projectList: newList});
    }

  render() {
    return (
    <div className="App">
      <ProjectForm onSave={this.updateList}></ProjectForm>
        <ProjectList onRemove={this.removeItem} projectlist={this.state.projectList}></ProjectList>
    </div>
  );}
}


export default App;
