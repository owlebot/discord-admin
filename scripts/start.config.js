module.exports = {
	apps: [
		{
			name: "Template",
			script: "index.js",
			cwd: "src",
			args: ["--color"],
			node_args: "",
            
			exec_mode: "fork",
			max_memory_restart: "1G",
            
			error: "../logs/error.err",
			output: "../logs/output.log",
			pid: "../logs/pid.pid",
            
			instances: 1,
			autorestart: true,
			wait_ready: true,
		},
	],
};
