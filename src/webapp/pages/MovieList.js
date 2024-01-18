import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Spinner, Badge, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import CustomPagination from '../components/CustomPagination';
import MoviesDetailsLink from '../components/MovieDetailsLink';

function MovieList() {
    const [data, setData] = useState({ movies: [], metadata: {} });
    const [searchFilter, setSearchFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [genreFilter, setGenreFilter] = useState('All');
    const [genres, setGenres] = useState([]);
    const pageSize = 3;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('v1/movies');
                const jsonData = await response.json();

                setData(jsonData);
                const allGenres = new Set(jsonData.movies.flatMap(movie => movie.genres));
                setGenres(['All', ...allGenres]);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilter]);

    const handleFilter = (e) => {
        setSearchFilter(e.target.value);
    };

    const filteredData = data.movies.filter(movie =>
        (genreFilter === 'All' || movie.genres.includes(genreFilter)) &&
        (movie.title.toLowerCase().includes(searchFilter.toLowerCase()) || movie.year.toString().includes(searchFilter))
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Container>
            <h1 className="mt-4">Movies</h1>
            <div className="d-flex justify-content-between mb-3">
                <InputGroup style={{width: '200px', marginRight: '10px'}}>
                    <FormControl
                        placeholder="Search"
                        value={searchFilter}
                        onChange={handleFilter}
                    />
                </InputGroup>

                <Dropdown onSelect={(eventKey) => setGenreFilter(eventKey)}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {genreFilter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {genres.map((genre, index) => (
                            <Dropdown.Item key={index} eventKey={genre}>
                                {genre}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    {paginatedData.length > 0 ? (
                        <ListGroup>
                            {paginatedData.map((movie) => (
                                <ListGroup.Item key={movie.id} as="li"
                                                className="d-flex justify-content-between align-items-start">
                                    <div className="me-auto">
                                        <MoviesDetailsLink
                                            id={movie.id}
                                            title={movie.title}
                                            year={movie.year}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        {movie.genres.map((genre, index) => (
                                            <Badge key={index} bg="primary" pill className="ms-2">
                                                {genre}
                                            </Badge>
                                        ))}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No movies found.</p>
                    )}

                    {filteredData.length > 3 &&
                        <>
                            <br/>
                            <CustomPagination
                                itemsCount={filteredData.length}
                                itemsPerPage={pageSize}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                alwaysShown={true}
                            />
                        </>
                    }
                </div>
            )}
        </Container>
    );
}

export default MovieList;
