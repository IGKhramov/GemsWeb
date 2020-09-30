<template>
    <tr>
        <td><input type="checkbox"></td>
        <td>{{id}}</td>
        <td>{{jobid}}</td>
        <td>{{workerid}}</td>
        <td>{{client}}</td>
        <td>{{description}}</td>
        <td><select class="box">
                <option value="Active">Active</option>
                <option value="Waiting" selected>Waiting</option>
                <option value="Finished">Finished</option>
            </select>
        </td>
        <td><select class="box">
                <option value="New">New</option>
                <option value="Continued" selected>Continued</option>
            </select>
        </td>
        <td><input type="datetime-local" :value="startdts"></td>
        <td><input type="datetime-local" :value="enddts"></td>
        <td><button text="Delete">Delete</button></td>
    </tr>
</template>

<script>
export default {
  name: 'JobItem',
    props: {
    id: {required: true, type: Number},
    jobid: {required: true, type: String},
    workerid: {required: true, type: Number},
    client: {required: true, type: String},
    description: {required: true, type: String},
    startdts: {required: true, type: String},
    enddts: {required: true, type: String},
    jobstatus: {required: true, type: String},
    jobtype: {required: true, type: String}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>