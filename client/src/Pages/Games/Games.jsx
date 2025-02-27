import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import GameCard from "../../components/GameCard/GameCard";
import "./Games.css";
import NavButtons from "../../components/NavButtons/NavButtons";
import PageSizeControl from "../../components/PageSizeControl/PageSizeControl";
import FilterControls from "../../components/FilterControls/FilterControls";

const fetchGenres = async () => {
  try {
    const res = await fetch("/api/genres");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const fetchStores = async () => {
  try {
    const res = await fetch("/api/stores");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const fetchPlatforms = async () => {
  try {
    const res = await fetch("/api/platforms");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

function Games() {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [filters, setFilters] = useState({
    genre: null,
    store: null,
    platform: null
  })
  const [genres, setGenres] = useState(null);
  const [stores, setStores] = useState(null);
  const [platforms, setPlatforms] = useState(null);
  const [filterLoading, setFilterLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setGenres(await fetchGenres());
      setStores(await fetchStores());
      setPlatforms(await fetchPlatforms());
    }

    try {
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setFilterLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      let filterUrl = `/api/games/${page}/${pageSize}?`;
        if (filters.genre) filterUrl += `&genre=${filters.genre.toLowerCase()}`;
        if (filters.platform) filterUrl += `&platform=${filters.platform.toLowerCase()}`;
        if (filters.store) filterUrl += `&store=${filters.store.toLowerCase()}`;
      try {
        const url = search
          ? `/api/search/${search}/${page}/${pageSize}`
          : filterUrl;
        const data = await fetch(url).then((res) => res.json());
        setGames(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, pageSize, search, filters]);

  

  function handleSearch(search) {
      setSearch(search);
      setPage(1);
  }

  function handleFilters(filters) {
    setFilters(filters);
    setPage(1);
  }

  function handleNextPage() {
    if(page < Math.ceil(games.count / pageSize))
    setPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    return;
  }

  if (loading || filterLoading) return <Loading />;
  if (!games) return <p>Error fetching games.</p>;

  return (
    <div className="games">
      <h1>Total games found: {games.count}</h1>

      <NavButtons
        onStepNext={handleNextPage}
        onStepPrev={handlePrevPage}
        page={page}
        totalPage={Math.ceil(games.count / pageSize)}
      />

      <FilterControls handleSearch={handleSearch} handleFilters={handleFilters} genres={genres} stores={stores} platforms={platforms}/>

      <PageSizeControl pageSize={pageSize} setPageSize={setPageSize} />

      <div className="cards-container">
        {games.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <NavButtons
        onStepNext={handleNextPage}
        onStepPrev={handlePrevPage}
        page={page}
        totalPage={Math.ceil(games.count / pageSize)}
      />
    </div>
  );
}

export default Games;
