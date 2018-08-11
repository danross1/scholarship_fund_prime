import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnhancedTable from '../Table/Table';
import FullScreenDialog from '../FullScreenDialog/FullScreenDialog';
import Autocomplete from '../Autocomplete/Autocomplete';
import Button from '@material-ui/core/Button';
import { getAllApplications } from '../../redux/actions/adminActions';
import SimpleTabs from '../SimpleTabs/SimpleTabs';

import './Admin.css';


const mapStateToProps = state => ({
  apps: state.admin.adminApplication,
  user: state.user,
  login: state.login,
});

class AdminPage extends Component {

  state = {
    active: null,
    selectedApplicant: [],
    allApplicants: this.props.apps,
  };

  componentDidMount() {
    this.props.dispatch(getAllApplications());
    console.log(this.state);
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && !this.props.user.admin) {
      this.props.history.push('home');
    }
  }

  setActive = (person) => {
    this.setState({
      active: person
    });
  }

  handleChange = (prevState) => (value) => {
    console.log(value);
    if (prevState !== this.state) {
      this.setState({
        selectedApplicant: [...this.state.selectedApplicant, value.value]
      });
    }
  };

  reset = (event) => {
    this.setState({
      selectedApplicant: []
    })
  }


  render() {

    let content = null;

    if(this.props.apps){content = (
      <div>
        <Autocomplete
          apps = {this.props.apps}
          handleChange = {this.handleChange}
          selectedApplicant = {this.state.selectedApplicant}
        />
      {this.state.selectedApplicant.length ? (
        <div>
          <div></div>
          <EnhancedTable
                setActive = {this.setActive}
                apps = {this.state.selectedApplicant}
                reset = {this.reset}
          />
        </div>
      ) : (
        <div>
          <EnhancedTable
                setActive = {this.setActive}
                apps = {this.props.apps}
                reset = {this.reset}
          />
        </div>
      )}


      </div>
    )
    };


    return (
      <div>
        <SimpleTabs/>
        <h1>ADMIN PAGE</h1>
        {this.state.active === null ? (
            content
        ) : (
          <FullScreenDialog
            person = {this.state.active}
            setActive = {this.setActive}
          />
        )
      }

      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);
