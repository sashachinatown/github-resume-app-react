import { Component } from 'react';
import './search-panel.css'
class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            placeholder: "Enter your valid GitHub username",
        }
    }  

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    onGetInfo = (e) => {

        e.preventDefault();

        const userName = this.state.value || 'sashachinatown';

        this.props.getData(userName);
        this.setState({value: ''});
        
    }

    render() {
        return (
            <form>
                <input value={this.state.value} onChange={this.handleChange} type="text" placeholder={this.state.placeholder}/>
                <button onClick={this.onGetInfo}>Try it!</button>
            </form>
        )
    }
}

export default SearchPanel;