import React from "react";
import DragHandle from "./component-drag-handle";
// import 'bootstrap/dist/css/bootstrap.min.css';  // Make sure Bootstrap CSS is imported

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roPreviewVisible: false,
    };
    console.log("oncopy",this)
  }
  handleDelete = () => {
    // This function will be called when the user confirms the deletion
    this.props.onDestroy(this.props.data);
    
  };

handleCopy=()=>{
  this.props.onCopy(this.props.data)
}
 
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

    return (
      <>
        <div className="toolbar-header"  >
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
              // data-bs-toggle="modal"
              // data-bs-target="#deleteModal"
              onClick={(e)=>{e.stopPropagation();this.handleCopy()}}
            >
              <i className="is-isolated fas fa-copy"></i>
            </div>
            <DragHandle
              data={this.props.data}
              index={this.props.index}
              onDestroy={this.props.onDestroy}
              setAsChild={this.props.setAsChild}
            />
           <div
              className="btn is-isolated"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={(e) => {e.stopPropagation();this.showRoPreview()}}
            >
              <i className="is-isolated fas fa-trash"></i>
            </div>
          </div>
        </div>
        {/* confirm delete form element modal  */}
        {this.state.roPreviewVisible && (
          <div className={roModalClass} role="dialog" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content modal-confirm-delete">
                <span onClick={(e) => {
                      e.stopPropagation();
                      this.closePreview();
                    }}>
                  <i className="fa fa-times fa-lg" />
                </span>
                <div className="Modal-custom-text-box">
                  <i
                    className="fa fa-exclamation-triangle fa-3x"
                    style={{ color: "red" }}
                  />
                  <p className="delete-modal-heading">Are you sure you want to delete this item?</p>
                  <p className="delete-modal-heading">
                  It will be deleted permanently.
                  </p>
                </div>

                <div className="modal-footer btn-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.closePreview();
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={(e) => {e.stopPropagation();this.props.onDestroy(this.props.data)}}
                    // onClick={(e) => {e.stopPropagation();this.props.onClear()}}
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
