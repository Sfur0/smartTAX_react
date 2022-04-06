// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// Custom Actions


// START IMPORT ACTIONS
import DocumentActions from "../redux/actions/DocumentActions";
import UserActions from "../redux/actions/UserActions";

// END IMPORT ACTIONS

/** APIs

* actionsDocument.create
*	@description CRUD ACTION create
*
* actionsDocument.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsDocument.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsUser.list
*	@description CRUD ACTION list
*

**/

class DocumentEdit extends Component {
  // Init document
  constructor(props) {
    super(props);
    this.state = {
      document: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsDocument.loadDocument(this.props.match.params.id);
    }
    
    this.props.actionsUser.loadUserList();
  }

  // Insert props document in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      document: props.document
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.document._id) {
      this.props.actionsDocument.saveDocument(this.state.document).then(data => {
        this.props.history.push("/documents/");
      });
    } else {
      this.props.actionsDocument.createDocument(this.state.document).then(data => {
        this.props.history.push("/documents/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>Document Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          
          <TextField
            id="Date"
            label="Date"
            value={this.state.document.Date || ""}
            onChange={Utils.handleChange.bind(this, "document")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="Name"
            label="Name"
            value={this.state.document.Name || ""}
            onChange={Utils.handleChange.bind(this, "document")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.document.Name && this.state.document.Name === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="Size"
            label="Size"
            value={this.state.document.Size || ""}
            onChange={Utils.handleChange.bind(this, "document")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="Type"
            label="Type"
            value={this.state.document.Type || ""}
            onChange={Utils.handleChange.bind(this, "document")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.document.Type && this.state.document.Type === ""
              ? { error: true }
              : {})}
          />
          
          {/* RELATIONS */}

          <h2 className="mb-20">Relations</h2>
          
          {/* Relation 1:m _users with User */}
          
          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="_users">
              _users
            </InputLabel>
            <Select
              value={this.state.document._users || ""}
              onChange={Utils.handleChangeSelect.bind(this, "document")}
              inputProps={{
                id: "_users",
                name: "_users"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.listUser && this.props.listUser.map(row => (
                <MenuItem value={row._id} key={row._id}>
                  {row._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          
          {/* Footer */}
          <div className="footer-card">
            <Link to="/documents/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsDocument: bindActionCreators(DocumentActions, dispatch),
    actionsUser: bindActionCreators(UserActions, dispatch),
  };
};

// Validate types
DocumentEdit.propTypes = { 
  actionsDocument: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    document: state.DocumentEditReducer.document,
    listUser: state.DocumentEditReducer.listUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentEdit);
