// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DialogDelete from "../components/DialogDelete";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";

// Table
import EnhancedTable from "../components/EnhancedTable";

// Custom Actions


// START IMPORT ACTIONS
import DocumentActions from "../redux/actions/DocumentActions";

// END IMPORT ACTIONS

/** APIs

* actionsDocument.delete
*	@description CRUD ACTION delete
*	@param ObjectId id - Id
*
* actionsDocument.list
*	@description CRUD ACTION list
*

**/


class DocumentList extends Component {
  // Init component
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false
    };
  }

  // Load data on start
  componentWillMount() {
    this.props.actionsDocument.loadDocumentList();
  }

  // Delete data
  delete(id) {
    this.setState({ openDialogDelete: true, idDelete: id });
  }

  closeDialogDelete() {
    this.setState({ openDialogDelete: false, idDelete: null });
  }

  confirmDialogDelete(id) {
    this.props.actionsDocument.deleteDocument(this.state.idDelete).then(data => {
      this.props.actionsDocument.loadDocumentList();
      this.setState({ openDialogDelete: false, idDelete: null });
    });
  }

  // Show content
  render() {
    const columns = [ 
      {
        id: "Date",
        type: "string",
        label: "Date"
      }, 
      {
        id: "Name",
        type: "string",
        label: "Name"
      }, 
      {
        id: "Size",
        type: "string",
        label: "Size"
      }, 
      {
        id: "Type",
        type: "string",
        label: "Type"
      },
    ];
    const link = "/documents/";

    return (
      <div>
        <h1>Document List</h1>

        <EnhancedTable
          data={this.props.list}
          columns={columns}
          link={link}
          onDelete={this.delete.bind(this)}
        />

        <DialogDelete
          open={this.state.openDialogDelete}
          onClose={this.closeDialogDelete.bind(this)}
          onConfirm={this.confirmDialogDelete.bind(this)}
        />

        {/*
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.list.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <Link to={"/documents/" + row._id} key={row._id}>
                    {row._id}
                  </Link>
                </TableCell>
                <TableCell align="right">{ row.Date }</TableCell>
                <TableCell align="right">{ row.Name }</TableCell>
                <TableCell align="right">{ row.Size }</TableCell>
                <TableCell align="right">{ row.Type }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        */}

        <div className="footer-card">
          <Link to="/documents/new">
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsDocument: bindActionCreators(DocumentActions, dispatch),
  };
};

// Validate types
DocumentList.propTypes = { 
  actionsDocument: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    list: state.DocumentListReducer.listDocument
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentList);
