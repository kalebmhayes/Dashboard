import React ,{Component}from 'react'
const {Provider, Consumer} = React.createContext()

class ContextProvider extends Component{
    state = {
        show: false
    }

    showForm = () =>{
        this.setState(()=>{
            return{
                show: true
            }
        })
    }

    hideForm = () =>{
        this.setState(()=>{
            return{
                show: false
            }
        })
    }

    toggleForm = () =>{
        this.setState(prevState =>{
            return{
                show: !prevState.show
            }
        })
    }

  

    render(){
        return(
            <Provider value={{show: this.state.show, showForm:this.showForm, hideForm:this.hideForm} }>
                {this.props.children}
            </Provider>
        )
    } 
}


export {ContextProvider, Consumer as ContextConsumer}


// class ThemeContextProvider extends Component {
//     state = {
//         theme: "dark"
//     }
    
//     toggleTheme = () => {
//         this.setState(prevState => {
//             return {
//                 theme: prevState.theme === "light" ? "dark" : "light"
//             }
//         })
//     }
    
//     render() {
//         return (
//             <Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
//                 {this.props.children}
//             </Provider>
//         )
//     }
// }

// export {ThemeContextProvider, Consumer as ThemeContextConsumer}



