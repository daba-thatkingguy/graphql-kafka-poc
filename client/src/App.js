import "bootstrap/dist/css/bootstrap.min.css"
import MainPage from "./HOC/index"
import Form from "./UserCreate"

function App() {
	return (
		<div className="App">
			<div className="container">
				<h1>Create user</h1>
				<Form />
			</div>
			<div style={{ width: "100%" }}>
				<MainPage />
			</div>
		</div>
	)
}

export default App
