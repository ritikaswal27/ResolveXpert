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
    role: ['manager', 'support', 'employee'],
    status: 'All Statuses',
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
    approvalIssues: [
      {
        issueId: '5681',
        type: 'software',
        title: 'Error 404 on internal portal',
        assignee: 'Karan',

        created: '30-10-2024',
      },
    ],
    users: [
      {
        empId: 'EMP001',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'Manager',
        gender: 'female',
        dateOfJoining: '2021-05-15',
      },
      {
        empId: 'EMP002',
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        role: 'Employee',
        gender: 'male',
        dateOfJoining: '2022-01-20',
      },
      {
        empId: 'EMP003',
        name: 'Catherine Lee',
        email: 'catherine.lee@example.com',
        role: 'Employee',
        gender: 'female',
        dateOfJoining: '2023-03-10',
      },
      {
        empId: 'EMP004',
        name: 'David Brown',
        email: 'david.brown@example.com',
        role: 'Manager',
        gender: 'male',
        dateOfJoining: '2020-07-25',
      },
      {
        empId: 'EMP005',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'Employee',
        gender: 'female',
        dateOfJoining: '2021-11-30',
      },
      {
        empId: 'EMP006',
        name: 'Frank Wilson',
        email: 'frank.wilson@example.com',
        role: 'Employee',
        gender: 'male',
        dateOfJoining: '2019-09-12',
      },
      {
        empId: 'EMP007',
        name: 'Grace Hall',
        email: 'grace.hall@example.com',
        role: 'Employee',
        gender: 'female',
        dateOfJoining: '2022-02-17',
      },
      {
        empId: 'EMP008',
        name: 'Henry Thompson',
        email: 'henry.thompson@example.com',
        role: 'Manager',
        gender: 'male',
        dateOfJoining: '2021-06-01',
      },
      {
        empId: 'EMP009',
        name: 'Isabella White',
        email: 'isabella.white@example.com',
        role: 'Employee',
        gender: 'female',
        dateOfJoining: '2020-04-28',
      },
      {
        empId: 'EMP010',
        name: 'Jack Taylor',
        email: 'jack.taylor@example.com',
        role: 'Employee',
        gender: 'male',
        dateOfJoining: '2023-08-05',
      },
    ], // Add users array for Users Page
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
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case 'SET_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
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
