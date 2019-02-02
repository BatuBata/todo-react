import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  
    getStyle = () => {
        return {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'none' : 'line-through' 
        }
        
        // if biasa juga bisa
        // if (this.props.todo.completed) {
        //     return {
        //         textDecoration: 'line-through'
        //     }
        // } else {
        //     return {
        //         textDecoration: 'none'
        //     }
        // }
    }

    render() {

    // const { id,title } = this.props.todo;
    // with api laravel
    const { id,title,created_at } = this.props.todo;
    return (
      <div style={ this.getStyle() } >
        <p>
            <input type="checkbox" 
                   onClick={this.props.markComplete.bind(this, id)} /> 
            {' '}
            { title }
            {/* with api laravel */}
            {' - '}
            { created_at }
            <button style={btnStyle} 
                    onClick={this.props.delTodo.bind(this, id)}>x</button>
        </p>
      </div>
    )
  }
}

// Proptypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
}

// style css menggunakan variable
// const itemStyle = {
//     backgroundColor: '#f4f4f4'
// }



export default TodoItem