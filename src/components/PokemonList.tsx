import styled from "styled-components";

interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    image: string;
}

interface PokemonListProps {
    data: Pokemon[];
}

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const Card = styled.div`
    width: 200px;
    padding: 12px;
    background-color: white;
    border: 2px solid red;
    border-radius: 10px;
`;

const PokemonImage = styled.img`
    width: 120px;
    height: 120px;
`;

const Name = styled.h3`
    font-size: 16px;
    color: darkslateblue;
    text-transform: capitalize;
`;

const Detail = styled.p`
    font-size: 13px;
    color: gray;
`;

export default function PokemonList(props: PokemonListProps) {
    return (
        <Grid>
            {props.data.map((item: Pokemon) => (
                <Card key={item.id}>
                    <PokemonImage src={item.image} alt={`image of ${item.name}`} />
                    <Name>#{item.id} {item.name}</Name>
                    <Detail>Height: {item.height}</Detail>
                    <Detail>Weight: {item.weight}</Detail>
                </Card>
            ))}
        </Grid>
    );
}