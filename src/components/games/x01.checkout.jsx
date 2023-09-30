import React from 'react';

import checkout from '../../utils/checkout';

import {
  Container,
  Card
} from 'react-bootstrap';

const Checkout = props => {
  const { score } = props

  return (
    <Container className="mt-3 p-0">
      <Card className='h-100 m-0 p-0 border-0 rounded-0 bg-tertiary-grey w-50'>
        <Card.Body className="m-0 p-0 border-0 rounded-0 bg-tertiary-grey">
          <Card.Title as="h6" className="bg-primary-green p-2 mb-0 text-white text-center span">
              Checkout
          </Card.Title>
          <Card.Text as="div" className="p-2 text-white vstack gap-2">
            {checkout[score].map((c, i) => {
              return <div className="text-center fs-8" key={i}>{c}</div>
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Checkout
