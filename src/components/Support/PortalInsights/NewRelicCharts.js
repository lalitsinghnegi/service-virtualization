const charts = {
    filter_thirty_minutes: {
        sources: [
            { name: 'CPU utilization (%) of ECS Fargate', source: 'e628e5c7-d151-4f1c-a11c-5aefd031d50e', size: 'large' },
            { name: 'Memory utilization (%) of ECS Fargate', source: 'fd67f9ba-a26c-47db-8b5c-8734ee203b58', size: 'large' }
        ]
    },
    filter_one_hour: {
        sources: [
            { name: 'CPU utilization (%) of ECS Fargate', source: 'eb019d1b-5ce1-465c-9cd0-05bc29e2c923', size: 'large' },
            { name: 'Memory utilization (%) of ECS Fargate', source: '2a02c27f-40d3-4b86-8d75-fed201dc5abd', size: 'large' }
       ]
    },
    filter_six_hours: {
        sources: [
            { name: 'CPU utilization (%) of ECS Fargate', source: '490b7168-dcc1-48bb-8340-f6aa4f6cf467', size: 'large' },
            { name: 'Memory utilization (%) of ECS Fargate', source: '979b65fe-10b5-44d8-bb7a-d2a1ef14cc31', size: 'large' }
       ]
    },
    filter_one_day: {
        sources: [
            { name: 'CPU utilization (%) of ECS Fargate', source: '3a32d91a-89d5-4fa1-8694-038ba1881c72', size: 'large' },
            { name: 'Memory utilization (%) of ECS Fargate', source: 'f0a8fed5-1741-48f5-9887-66bf95b3baee', size: 'large' }
      ]
    },
    filter_seven_days: {
        sources: [
            { name: 'CPU utilization (%) of ECS Fargate', source: 'b8d07570-eaaa-4179-8a47-6a39d9971573', size: 'large' },
            { name: 'Memory utilization (%) of ECS Fargate', source: '8ccd1be7-5ba3-4c54-9f26-8b0b0c226aa7', size: 'large' }
         ]
    }
}

module.exports = charts;

