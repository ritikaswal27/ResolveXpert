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
    category: 'all', // Added category filter for Issue Approval
    employee: 'all', // Added employee filter for Issue Approval
    sortBy: 'createdAt', // Sorting field
    order: 'asc', // Sorting order
    search: '', // Search term
  },
  userFilters: {
    // New filters specific to Users Page
    role: 'all',
    gender: 'all',
    search: '',
  },
  sort: {
    field: 'createdAt',
    order: 'asc',
  },
  userSort: {
    field: 'doj',
    order: 'asc',
  },
  pagination: {
    page: 0,
    limit: 10,
  },
  data: {
    issues: [
      // {
      //   issueId: '5678',
      //   type: 'software',
      //   title: 'Eclipse not working',
      //   description:
      //     'Eclipse IDE fails to start after the latest update. Error related to Java runtime environment.',
      //   status: 'Not_Approved',
      //   assignee: 'Rahul',
      //   reporter: 'Ritik',
      //   created: '03-11-2024',
      //   updated: '04-11-2024',
      //   remarks: ['Restarted the IDE'],
      // },
      // {
      //   issueId: '5679',
      //   type: 'hardware',
      //   title: 'Keyboard not functioning',
      //   description:
      //     'Certain keys on the keyboard are not responsive after the device restart.',
      //   status: 'In_Progress',
      //   assignee: 'Sonal',
      //   reporter: 'Amit',
      //   created: '02-11-2024',
      //   updated: '04-11-2024',
      //   remarks: ['Checked connections', 'Ordered replacement keyboard'],
      // },
      // {
      //   issueId: '5680',
      //   type: 'network',
      //   title: 'VPN connection unstable',
      //   description:
      //     'Frequent disconnections when connected to the VPN. Affects ability to access remote resources.',
      //   status: 'Approved',
      //   assignee: 'Neha',
      //   reporter: 'Suresh',
      //   created: '01-11-2024',
      //   updated: '03-11-2024',
      //   remarks: ['Reconfigured VPN settings', 'Network team notified'],
      // },
      // {
      //   issueId: '5681',
      //   type: 'software',
      //   title: 'Error 404 on internal portal',
      //   description:
      //     'Receiving a 404 error when trying to access the internal documentation portal.',
      //   status: 'Resolved',
      //   assignee: 'Karan',
      //   reporter: 'Ritika',
      //   created: '30-10-2024',
      //   updated: '01-11-2024',
      //   remarks: ['Cleared cache and cookies', 'Fixed routing issue on server'],
      // },
    ],
    approvalIssues: [
      {
        issueType: 'Bug',
        issueId: 'ISSUE-001',
        description:
          'The login page fails to load on the latest version of Chrome.',
        issueTitle: 'Login Page Load Issue',
        raisedBy: 'John Doe',
        createdAt: '2024-10-01T14:30:00Z',
      },
      {
        issueType: 'Feature Request',
        issueId: 'ISSUE-002',
        description: 'Request to add dark mode support for the application.',
        issueTitle: 'Add Dark Mode',
        raisedBy: 'Jane Smith',
        createdAt: '2024-10-03T09:00:00Z',
      },
      {
        issueType: 'Improvement',
        issueId: 'ISSUE-003',
        description:
          'Optimize the loading time of the dashboard by improving backend queries.',
        issueTitle: 'Dashboard Performance Optimization',
        raisedBy: 'Michael Johnson',
        createdAt: '2024-10-05T16:45:00Z',
      },
    ],
    users: [
      // {
      //   empId: 'EMP011',
      //   name: 'John Doe',
      //   email: 'john.doe@example.com',
      //   role: 'Employee',
      //   gender: 'male',
      //   dateOfJoining: '2023-06-15',
      // },
      // {
      //   empId: 'EMP012',
      //   name: 'Jane Smith',
      //   email: 'jane.smith@example.com',
      //   role: 'Manager',
      //   gender: 'female',
      //   dateOfJoining: '2021-08-25',
      // },
    ],
    employees: [],
    categories: [],
    statuses: [
      'not_accepted',
      'in_progress',
      'accepted',
      'resolved',
      'rejected',
    ],
    assignees: [],
    roles: ['manager', 'support', 'employee'],
    genders: ['male', 'female', 'other'],
  },
  loading: false,
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_APPROVAL_FILTER':
      return {
        ...state,
        approvalFilters: { ...state.approvalFilters, ...action.payload },
      };
    case 'SET_USER_FILTER': // New case for Users Page filters
      return {
        ...state,
        userFilters: { ...state.userFilters, ...action.payload },
      };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_USER_SORT':
      return { ...state, userSort: action.payload };
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case 'SET_DATA':
      console.log(action);
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'SET_DATA_ISSUES':
    case 'SET_DATA_FOR_USERS':
      console.log('set data for user dispatch', action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          users: [...action.payload.users],
        },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_ISSUE_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          categories: [...state.data.categories, action.payload.name],
        },
      };
    default:
      return state;
  }
};

export { dashboardReducer, initialState };
