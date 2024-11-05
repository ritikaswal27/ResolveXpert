// context/IssueContext.js

const initialState = {
  filter: {
    category: 'all',
    status: 'all',
    assignee: 'all',
    onlyMyIssues: false,
    search: '',
  },
  approvalFilters: {
    // New filters specific to Issue Approval Page
    issueAge: 'All',
    raisedBy: 'All',
    sortBy: 'Submission Date (Newest)',
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
        issueId: '5678',
        type: 'software',
        title: 'Eclipse not working',
        description:
          'Eclipse IDE fails to start after the latest update. Error related to Java runtime environment.',
        status: 'Not_Approved',
        assignee: 'Rahul',
        reporter: 'Ritik',
        created: '03-11-2024',
        updated: '04-11-2024',
        remarks: ['Restarted the IDE'],
      },
      {
        issueId: '5679',
        type: 'hardware',
        title: 'Keyboard not functioning',
        description:
          'Certain keys on the keyboard are not responsive after the device restart.',
        status: 'In_Progress',
        assignee: 'Sonal',
        reporter: 'Amit',
        created: '02-11-2024',
        updated: '04-11-2024',
        remarks: ['Checked connections', 'Ordered replacement keyboard'],
      },
      {
        issueId: '5680',
        type: 'network',
        title: 'VPN connection unstable',
        description:
          'Frequent disconnections when connected to the VPN. Affects ability to access remote resources.',
        status: 'Approved',
        assignee: 'Neha',
        reporter: 'Suresh',
        created: '01-11-2024',
        updated: '03-11-2024',
        remarks: ['Reconfigured VPN settings', 'Network team notified'],
      },
      {
        issueId: '5681',
        type: 'software',
        title: 'Error 404 on internal portal',
        description:
          'Receiving a 404 error when trying to access the internal documentation portal.',
        status: 'Resolved',
        assignee: 'Karan',
        reporter: 'Ritika',
        created: '30-10-2024',
        updated: '01-11-2024',
        remarks: ['Cleared cache and cookies', 'Fixed routing issue on server'],
      },
    ],
    categories: ['Software', 'Hardware'],
    statuses: [],
    assignees: ['ritik', 'manav', 'ashutosh'],
  },
  loading: false,
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_APPROVAL_FILTER': // New case for Issue Approval Page filters
      return {
        ...state,
        approvalFilters: { ...state.approvalFilters, ...action.payload },
      };
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
