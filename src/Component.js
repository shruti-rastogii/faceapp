const Component = (props) => {
    return <div className="component" style={{backgroundColor: props.error?'rgba(255,138,152,0.7)': 'rgb(98, 255, 138, 0.7)'}}>
      {props.title} {props.value}
    </div>
  }
export default Component