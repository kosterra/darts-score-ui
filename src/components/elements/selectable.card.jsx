import {
    Container,
    Card
} from 'react-bootstrap';

import Avatar from 'react-avatar';

const SelectableCard = (props) => {
    const {
        item,
        isSelected,
        selectable,
        onSelectCard,
        cssClass
    } = props

    const handleCardSelect = () => {
        if (selectable || (isSelected && !selectable)) {
            onSelectCard(item);
        }
    }

    return (
        <Container className="p-0">
            <Card as='a'
                onClick={handleCardSelect}
                className={`rounded-0 selectable-card card-list-card ${isSelected ? 'selected' : ''} ${!selectable && !isSelected ? 'disabled' : ''} ${cssClass ? cssClass : ''}`}>
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title as="h6" className="bg-primary p-2 mb-0 text-white text-center span">
                        {item ? item.nickname : 'Select a Player'}
                    </Card.Title>
                    <Card.Text as="div" className="p-2 text-white">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Avatar
                                name={(item ? item.firstname : '') + ' ' + (item ? item.lastname : '')}
                                src={item ? item.profileImg : ''}
                                size="80" round={true}
                                color="#565656"
                                textSizeRatio={0.2}
                                className="align-self-center"
                            />
                            <span className="mt-1 text-center text-shade700">
                                {(item ? item.firstname : '') + ' ' + (item ? item.lastname : '')}
                            </span>
                        </div>
                    </Card.Text>
                </Card.Body>
                {isSelected &&
                    <i className="fas fa-check-circle selected" />
                }
            </Card>
        </Container>
    );
}

export default SelectableCard;