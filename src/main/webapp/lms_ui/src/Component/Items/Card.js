import React,{Component} from "react"
class Card extends Component{
    constructor(props) {
        super();
        this.state={
            title: props.title,

        }
    }
    render() {
        return (
            <div>
                <div className="cardContainer">
                    <div className="cardDash">
                        <div className="content">
                            <h2>{this.state.title}</h2>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Card
