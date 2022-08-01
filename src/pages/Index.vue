<template>
  <q-page class="bg-white">
    <div
      class="row q-pt-md"
      group="columns"
    >
      <div class="col-4 rounded-borders q-px-lg">
        <q-card class="q-pa-xs bg-blue-grey-4">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm rounded-borders">
            <q-item-section class="text-h6 text-weight-bolder text-center text-color">Todo</q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
          <q-card class="q-mx-lg" v-if="add_model.planned">
              <q-card-section  class = "bg-deep-purple">
                <div class="text-h6 text-white">
                  Add New
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input dense v-model="task_title" label="Title"/>
                <q-input dense class="q-mt-md" v-model="time_duration" label="Time Duration"  />
                <q-input dense class="q-mt-md" v-model="task_description" label="Description" />
              </q-card-section>
              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn round color="purple" glossy icon="check"  @click="addTask()" class="text-capitalize"></q-btn>
                <q-btn round color="negative" glossy icon="clear" @click="add_model.planned=false"></q-btn>
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add New" @click="add_model.planned=true"/>
            </q-item>
            <draggable
              class="list-group"
              :list="planned_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in planned_task"
                v-bind:key="index"
                class="rounded-borders q-my-sm q-mx-lg"
                @mouseover="$set(task_selected_index,'planned',index)"
                @mouseleave="task_selected_index.planned = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{item.title}}</span>
                    <span class="float-right text-green q-mt-md q-mr-md">{{item.time_duration}}
                    <q-icon
                      filled
                      size="sm"
                      name="cancel"
                      class="absolute-top-right q-mr-xs q-my-xs text-red"
                      v-if="index==task_selected_index.planned"
                      @click="deleteTask('planned', task_selected_index.planned, item.id)"
                    />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pb-md q-ml-md text-grey-8">
                  {{item.description}}
                </q-card-section>
              </q-card>
            </draggable>
          </q-scroll-area>
        </q-card>
      </div>

      <div class="col-4 q-px-lg">
        <q-card class="q-pa-xs bg-indigo">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-center text-color">In progress</q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="wip_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in wip_task"
                v-bind:key="index"
                class="rounded-borders q-my-sm q-mx-lg"
                @mouseover="task_selected_index.wip = index"
                @mouseleave="task_selected_index.wip = null"
              >
                <q-card-section class="row q-pa-md">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{item.title}}</span>
                    <span class="float-right text-green q-mt-md q-mr-md">{{item.time_duration}}
                    <q-icon
                      filled
                      size="sm"
                      name="cancel"
                      class="absolute-top-right q-mr-xs q-mt-xs text-red"
                      v-if="index==task_selected_index.wip"
                      @click="deleteTask('wip', task_selected_index.wip, item.id)"
                    />
                    </span>
                  </div>
                </q-card-section>
                  <q-card-section class="q-pb-md q-ml-md text-grey-8">
                  {{item.description}}
                </q-card-section>
              </q-card>
            </draggable>
          </q-scroll-area>
        </q-card>
      </div>
      <div class="col-4 q-px-lg">
        <q-card class="q-pa-xs bg-green-13 ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-center text-color">Completed
            </q-item-section>
          </q-item>

          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="completed_task"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in completed_task"
                v-bind:key="index"
                class="rounded-borders q-mx-lg q-my-sm"
                @mouseover="task_selected_index.completed = index"
                @mouseleave="task_selected_index.completed = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{item.title}}</span>
                    <span class="float-right text-green q-mt-md q-mr-md">{{item.time_duration}}
                    <q-icon
                      filled
                      size="sm"
                      name="cancel"
                      class="absolute-top-right q-mr-xs q-mt-xs text-red"
                      v-if="index==task_selected_index.completed"
                      @click="deleteTask('completed', task_selected_index.completed, item.id)"
                    />
                    </span>
                  </div>
                </q-card-section>
                 <q-card-section class="q-pb-md q-ml-md text-grey-8">
                  {{item.description}}
                </q-card-section>
              </q-card>
            </draggable>
          </q-scroll-area>
        </q-card>
      </div>

    </div>
    <q-resize-observer @resize="onResize"/>
  </q-page>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'

Vue.component('draggable', draggable)
export default {
  name: 'index',
  data () {
    return {
      task_description: '',
      task_title: '',
      time_duration: '',
      task_selected_index: {
        completed: null,
        planned: null,
        wip: null
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      add_model: {
        completed: false,
        planned: false,
        wip: false
      },
      add_data: {
        completed: {},
        planned: {},
        wip: {}
      },
      size: {},
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },
      planned_task_prev_length: 0,
      wip_task_prev_length: 0,
      completed_task_prev_length: 0,
      first_load: true,
      planned_task: [
      ],
      wip_task: [
      ],
      completed_task: [
      ]

    }
  },
  watch: {
    completed_task: {
      deep: true,
      handler (val) {
        if (val.length >= this.completed_task_prev_length && !this.first_load) {
          this.update(val, 2)
        }
      }
    },
    wip_task: {
      deep: true,
      handler (val) {
        if (val.length >= this.wip_task_prev_length && !this.first_load) {
          this.update(val, 1)
        }
      }
    },
    planned_task: {
      deep: true,
      handler (val) {
        if (val.length > this.planned_task_prev_length && !this.first_load) {
          this.update(val, 0)
        }
      }
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    getHeight () {
      return this.size.height - 90 + 'px'
    }
  },
  mounted () {
    this.$axios.get('http://localhost:8000/api/todo/get', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        res.data.data.forEach(element => {
          if (element.status === '0') {
            this.planned_task.push(
              {
                title: element.title,
                time_duration: element.duration,
                description: element.description,
                id: element.id
              }
            )
          } else if (element.status === '1') {
            this.wip_task.push(
              {
                title: element.title,
                time_duration: element.duration,
                description: element.description,
                id: element.id
              }
            )
          } else if (element.status === '2') {
            this.completed_task.push(
              {
                title: element.title,
                time_duration: element.duration,
                description: element.description,
                id: element.id
              }
            )
          }
        })
        this.planned_task_prev_length = this.planned_task.length
        this.wip_task_prev_length = this.wip_task.length
        this.completed_task_prev_length = this.completed_task.length
        this.first_load = false
      }).catch(error => {
        console.log(error)
      })
  },
  methods: {
    update (val, status) {
      console.log(status)
      const arr = []
      val.forEach(element => {
        arr.push(element.id)
      })
      const formData = new FormData()
      formData.append('ids', arr)
      formData.append('status', status)
      this.$axios.post('http://localhost:8000/api/todo/update', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((res) => {
          console.log(res)
          this.planned_task_prev_length = this.planned_task.length
          this.wip_task_prev_length = this.wip_task.length
          this.completed_task_prev_length = this.completed_task.length
        })
    },
    addTask () {
      const formData = new FormData()
      formData.append('title', this.task_title)
      formData.append('description', this.task_description)
      formData.append('duration', this.time_duration)

      this.$axios.post('http://localhost:8000/api/todo/add', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((res) => {
          this.planned_task.push(
            {
              title: this.task_title,
              time_duration: this.time_duration,
              description: this.task_description,
              id: res.data.id
            }
          )
          this.task_title = null
          this.time_duration = null
          this.task_description = null
          this.add_model.planned = false
        }).catch(error => {
          console.log(error)
        })
    },
    onResize (size) {
      this.size = size
    },
    deleteTask (name, index, id) {
      const formData = new FormData()
      formData.append('id', id)
      this.$axios.post('http://localhost:8000/api/todo/delete', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((res) => {
          console.log(res)
          if (name === 'planned') {
            this.planned_task.splice(index, 1)
          }
          if (name === 'wip') {
            this.wip_task.splice(index, 1)
          }
          if (name === 'completed') {
            this.completed_task.splice(index, 1)
          }
        })
    }
  }
}
</script>

<style scoped>
  .text-color {
    color: white
  }
</style>
