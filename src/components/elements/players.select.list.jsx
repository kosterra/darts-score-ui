import Avatar from 'react-avatar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

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
        <Container className="p-1">
            <Card as='a'
                onClick={handleCardSelect}
                className={`rounded-0 selectable-card card-list-card ${isSelected ? 'selected' : ''} ${!selectable && !isSelected ? 'disabled' : ''} ${cssClass ? cssClass : ''}`}>
                <Card.Body className="m-0 p-0 border-0 rounded-0">
                    <Card.Title as="h6" className="bg-primary p-2 mb-0 text-shade100 text-center span">
                        {item.nickname}
                    </Card.Title>
                    <Card.Text as="div" className="p-2 text-shade100">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Avatar
                                name={item.firstname + ' ' + item.lastname}
                                src={item.profileImg}
                                size="80" round={true}
                                color="#565656"
                                textSizeRatio={0.2}
                                className="align-self-center"
                            />
                            <span className="mt-1 text-center text-shade700">{item.firstname + ' ' + item.lastname}</span>
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

const PlayersSelectList = (props) => {
    const {
        itemType,
        items,
        selectedItems,
        emptyText,
        maxSelectable,
        setSelectedItems,
        listCssClass,
        cardCssClass
    } = props

    const onSelectCard = (item) => {
        if (!selectedItems.includes(item)) {
            if (selectedItems.length < maxSelectable) {
                setSelectedItems([...selectedItems, item]);
            }
        } else {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        }
    }

    return (
        <Container className={`px-1 p-0 selectable-card-list card-list ${listCssClass ? listCssClass : ''}`}>
            <div className="d-flex justify-content-center mb-4">
                <span className="empty-text text-shade600 fs-7">
                    {'Select ' + maxSelectable + ' ' + itemType}
                </span>
            </div>
            {items.length > 0 &&
                <Row xs={1} sm={2} md={3} lg={4} xl={4} className="mb-2">
                    {items.map((item, idx) => (
                        <SelectableCard
                            key={idx}
                            item={item}
                            isSelected={selectedItems.some(e => e.id === item.id)}
                            selectable={selectedItems.length < Number(maxSelectable)}
                            onSelectCard={onSelectCard}
                            cssClass={cardCssClass} />
                    ))}
                </Row>
            }
            {items.length === 0 &&
                <div className="d-flex justify-content-center mb-4">
                    <span className="empty-text text-shade600">{emptyText}</span>
                </div>
            }
        </Container>
    );
}

export default PlayersSelectList;