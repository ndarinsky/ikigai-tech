import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';

configure({
  getElementError: (message) => {
    const err = new Error(message);
    err.name = 'TestingLibraryElementError';
    return err;
  },
});