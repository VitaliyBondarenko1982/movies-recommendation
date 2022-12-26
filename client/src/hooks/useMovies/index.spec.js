import { renderHook, act } from '@testing-library/react';
import useMovies from './index';
import { MAX_SELECTED_MOVIES } from '../../constants';

describe('useMovies hook', () => {
  const basicMovie = {
    id: 1,
    title: 'Movie title',
  };

  test('should select movie', () => {
    const { result } = renderHook(() => useMovies());

    act(() => {
      const selectMovieFn = result.current.selectMovie(basicMovie);

      selectMovieFn();
    });

    expect(result.current.selectedMovies.length).toBe(1);
    expect(result.current.selectedMovies[0].id).toBe(basicMovie.id);
  });

  test('should delete movie', () => {
    const { result } = renderHook(() => useMovies());

    act(() => {
      const selectMovieFn = result.current.selectMovie(basicMovie);

      selectMovieFn();
    });

    expect(result.current.selectedMovies.length).toBe(1);

    act(() => {
      const deleteMovieFn = result.current.deleteMovie(basicMovie);

      deleteMovieFn();
    });

    expect(result.current.selectedMovies.length).toBe(0);
  });

  test('should select movie only once', () => {
    const { result } = renderHook(() => useMovies());

    act(() => {
      const selectMovieFn = result.current.selectMovie(basicMovie);

      selectMovieFn();
      selectMovieFn();
    });

    expect(result.current.selectedMovies.length).toBe(1);
    expect(result.current.selectedMovies[0].id).toBe(basicMovie.id);
  });

  test('should add no more movies than it is allowed', () => {
    const { result } = renderHook(() => useMovies());

    for (let i = 0; i < MAX_SELECTED_MOVIES; i += 1) {
      act(() => {
        const selectMovieFn = result.current.selectMovie({
          ...basicMovie,
          id: i,
        });

        selectMovieFn();
      });
    }

    expect(result.current.selectedMovies.length).toBe(MAX_SELECTED_MOVIES);

    act(() => {
      const selectMovieFn = result.current.selectMovie({
        ...basicMovie,
        id: 123,
      });

      selectMovieFn();
    });

    expect(result.current.selectedMovies.length).toBe(MAX_SELECTED_MOVIES);
  });
});
