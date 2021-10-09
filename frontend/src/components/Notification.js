import React from 'react';
import ReactNotifications from 'react-browser-notifications';

class Noti extends React.Component {
    constructor() {
        super();
        this.showNotifications = this.showNotifications.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    showNotifications() {
        if (this.n.supported()) this.n.show();
    }

    handleClick(event) {
        // Close the notification
        this.n.close(event.target.tag);
    }

    /*  componentDidMount(){
          setInterval(()=>{
              this.showNotifications();
          },10000)    
      }*/

    render() {
        return (
            <div>

                <ReactNotifications
                    onRef={ref => (this.n = ref)}
                    title="Cita medica pronto"
                    body="Señor Martínez"
                    icon="data:image/png;base64,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"
                    tag="5"
                    timeout="5000"
                    onClick={event => this.handleClick(event)}
                />

                <button onClick={this.showNotifications}>
                    Notify Me!
                </button>

            </div>
        )
    }
}

export default Noti;