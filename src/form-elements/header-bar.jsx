import React from "react";
import DragHandle from "./component-drag-handle";
// import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure Bootstrap CSS is imported

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roPreviewVisible: false,
    };
  }
  handleDelete = () => {
    // This function will be called when the user confirms the deletion
    this.props.onDestroy(this.props.data);
  };
  showRoPreview() {
    console.log("yahho");
    this.setState({
      roPreviewVisible: true,
    });
  }
  closePreview() {
    this.setState({
      roPreviewVisible: false,
    });
  }
  render() {
    let roModalClass = "modal  modal-dialog-centered ";
    if (this.state.roPreviewVisible) {
      roModalClass += " show ";
    }

    console.log(this.roPreviewVisible);
    return (
      <>
        <div className="toolbar-header">
          <span className="badge badge-secondary">{this.props.data.text}</span>
          <div className="toolbar-header-buttons">
            {this.props.data.element !== "LineBreak" && (
              <div
                className="btn is-isolated"
                onClick={this.props.editModeOn.bind(
                  this.props.parent,
                  this.props.data
                )}
              >
                <i className="is-isolated fas fa-edit"></i>
              </div>
            )}
            <div
              className="btn is-isolated"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => this.showRoPreview()}
            >
              <i className="is-isolated fas fa-trash"></i>
            </div>

            <DragHandle
              data={this.props.data}
              index={this.props.index}
              onDestroy={this.props.onDestroy}
              setAsChild={this.props.setAsChild}
            />
          </div>
        </div>
        {/* confirm delete form element modal  */}
        {this.state.roPreviewVisible && (
          <div className={roModalClass} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content modal-confirm-delete">
                <span onClick={this.closePreview.bind(this)}>
                  <i className="fa fa-times fa-lg" />
                </span>
                <div className="Modal-custom-text-box">
                  <i
                    className="fa fa-exclamation-triangle fa-3x"
                    style={{ color: "red" }}
                  />
                  <p className="delete-modal-heading">Are you sure?</p>
                  <p className="delete-modal-heading">
                    this will delete it permanently!
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => this.props.onDestroy(this.props.data)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
