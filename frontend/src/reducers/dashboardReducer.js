export const initialState = {
  filter: {
    category: 'all',
    status: 'all',
    assignee: 'all',
    onlyMyIssues: false,
    search: '',
  },
  sort: {
    field: 'createdAt',
    order: 'asc',
  },
  pagination: {
    page: 1,
    limit: 10,
  },
  data: {
    issues: [
      {
        issueId: "5678"
        type: 'software',
        title: 'Eclipse not working',
        status: 'Not_Approved',
        assignee: 'rahul',
        reporter: 'Ritik',
        created: '03-11-2024',
        updated: "date"
      },
    ],
    categories: [],
    statuses: [],
    assignees: [],
  },
  loading: false,
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case 'SET_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export { dashboardReducer, initialState };
