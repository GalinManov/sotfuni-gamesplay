import CatalogItem from "./CatalogItem";

const Catalog = ({ games }) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* Display div: with information about every game (if any) */}
            {games.map(game => <CatalogItem key={game._id} game={game} />)}
            {games.length == 0 &&
                <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    )
}

export default Catalog;