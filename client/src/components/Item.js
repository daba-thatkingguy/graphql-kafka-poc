import { Container, Row, Col } from "react-bootstrap"
import React from "react"

function Item(props) {
	return (
		<Container>
			<Row>
				{props &&
					props.map((item) => {
						return (
							<div key={item._id}>
								<Col>{item.name}</Col>
								<Col>{item.description}</Col>
							</div>
						)
					})}{" "}
				: <h1>{props.error}</h1>
			</Row>
		</Container>
	)
}

export default Item
