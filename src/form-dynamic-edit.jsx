import React from "react";

const FormElementsEditor = (props) => {
  const [dynamic, setDynamic] = React.useState(null);

  React.useEffect(() => {
    const loadDynamic = async () => {
      const x = await import("./form-elements-edit");
      setDynamic(() => x.default);
    };
    loadDynamic();
  }, []);

  if (!dynamic) {
    return <div>Loading...</div>;
  }
  const Component = dynamic;
  return (
    <div >
      <div style={{width:'100%',display:'flex',justifyContent:'end'}}>

      <button style={{background:'none',borderRadius:'50%',border:'none',fontSize:'1.1rem'}} onClick={()=>props.manualEditModeOff()} >
        X
      </button>
      </div>
      <Component {...props} />;
    </div>
  );
};

export default FormElementsEditor;
